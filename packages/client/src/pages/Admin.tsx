import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { useAuthContext } from '../AuthProvider';
import { useAdmin } from '../hooks/useAdmin';

const Admin = () => {
  const { user } = useAuthContext();
  const { adminCSSProperties, collectionNames, getList, checkPageAuthority } =
    useAdmin();

  // 현재 collection, list name
  const [currentInfo, setCurrentInfo] = useState({
    collectionInfo: '',
    listInfo: '',
  });
  // 현재 list data
  const [list, setList] = useState<{ [key: string]: any }[]>([]);
  // 현재 field data
  const [field, setField] = useState<{ [key: string]: any }>({});
  // delete Icon
  const [deleteIcon, setDeleteIcon] = useState<boolean[]>([false]);

  const collectionNamesList = [
    collectionNames.boardgamesTableName,
    collectionNames.groupTableName,
    collectionNames.userTableName,
  ];

  if (!checkPageAuthority(user)) {
    if (user?.uid) {
      return (
        <Alert status="error">
          <AlertIcon />
          권한이 없습니다.
        </Alert>
      );
    }
    return <Navigate to="/login" />;
  }
  return (
    <Flex flexDirection="column" align="center">
      <Heading as="h2" size="xl" mt={9}>
        Admin Page
      </Heading>
      <TableContainer>
        <Table variant="simple" style={{ tableLayout: 'fixed' }}>
          <TableCaption>Admin page</TableCaption>
          <Thead>
            <Tr>
              <Th style={adminCSSProperties.styleColumnCollection}>
                Collections
              </Th>
              <Th style={adminCSSProperties.styleColumnList}>List</Th>
              <Th style={adminCSSProperties.styleColumnField}>Field</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr style={{ verticalAlign: 'top' }}>
              <Td style={adminCSSProperties.styleColumnCollection}>
                {collectionNamesList.map((collectionName: string) => (
                  <div key={collectionName}>
                    <Button
                      style={adminCSSProperties.styleButtonCollection}
                      onClick={() => {
                        getList(db, collectionName).then((listData) => {
                          setCurrentInfo({
                            collectionInfo: collectionName,
                            listInfo: '',
                          });
                          setList(listData);
                          setField({});
                        });
                      }}
                    >
                      {collectionName}
                    </Button>
                  </div>
                ))}
              </Td>
              <Td style={adminCSSProperties.styleColumnList}>
                {list.map((listItem: { [key: string]: any }, index) => (
                  <div key={'uid' in listItem ? listItem.uid : listItem.id}>
                    <Button
                      style={adminCSSProperties.styleButtonList}
                      onClick={() => {
                        const tempListInfo =
                          'uid' in listItem ? listItem.uid : listItem.id;
                        setCurrentInfo({
                          collectionInfo: currentInfo.collectionInfo,
                          listInfo: tempListInfo,
                        });
                        setField(list[index]);
                      }}
                    >
                      {listItem.name}
                    </Button>
                  </div>
                ))}
              </Td>
              <Td
                rowSpan={list.length}
                style={adminCSSProperties.styleColumnField}
              >
                <div>
                  <Button>
                    <AddIcon style={{ marginRight: 10 }} /> 필드 추가
                  </Button>
                </div>
                {Object.keys(field).map((key, index) => (
                  <div
                    key={key}
                    style={{
                      ...adminCSSProperties.styleColumnField,
                      height: 50,
                      display: 'table',
                      tableLayout: 'fixed',
                      backgroundColor: deleteIcon[index] ? '#EEEEEE' : 'white',
                    }}
                    onFocus={() => {}}
                    onMouseOver={() => {
                      const changeDeleteIcon = [];
                      changeDeleteIcon[index] = true;
                      setDeleteIcon(changeDeleteIcon);
                    }}
                    onMouseLeave={() => {
                      const changeDeleteIcon = [];
                      changeDeleteIcon[index] = false;
                      setDeleteIcon(changeDeleteIcon);
                    }}
                  >
                    <div
                      style={{
                        ...adminCSSProperties.styleColumnField,
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {key} : {field[key]}
                      {deleteIcon[index] ? (
                        <div style={{ alignItems: 'right' }}>
                          <Button size="xs">
                            <EditIcon />
                          </Button>
                          <Button size="xs">
                            <DeleteIcon color="red" />
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th style={adminCSSProperties.styleColumnCollection}>
                Collections
              </Th>
              <Th style={adminCSSProperties.styleColumnList}>List</Th>
              <Th style={adminCSSProperties.styleColumnField}>Field</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default Admin;
