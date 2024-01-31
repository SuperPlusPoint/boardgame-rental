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
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { useAuthContext } from '../AuthProvider';
import { useAdmin } from '../hooks/useAdmin';
import ModalInputKeyValue from '../components/ModalInputKeyValue';
import ModalWarning from '../components/ModalWarning';

const Admin = () => {
  const { user } = useAuthContext();
  const {
    adminCSSProperties,
    collectionNames,
    getList,
    checkPageAuthority,
    updateField,
    deleteFieldData,
  } = useAdmin();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const warningModal = useDisclosure();

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

  // 현재 field data의 list index
  const [listIndex, setListIndex] = useState(-1);
  // field key
  const [dataKey, setDataKey] = useState<string>('');
  // field value
  const [dataValue, setDataValue] = useState<any>('');

  // update 시 새로운 데이터 추가여부 판단
  const [addNew, setAddNew] = useState<boolean>(false);
  const resetData = () => {
    setDataKey('');
    setDataValue('');
  };

  const customOnClose = () => {
    resetData();
    onClose();
  };

  const collectionNamesList = [
    collectionNames.boardgamesTableName,
    collectionNames.groupTableName,
    collectionNames.userTableName,
  ];

  const onSubmit = () => {
    updateField(
      user,
      db,
      currentInfo.collectionInfo,
      currentInfo.listInfo,
      { [dataKey]: dataValue },
      list,
      setList,
      listIndex,
      addNew
    );
    resetData();
    onClose();
  };

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
                        setListIndex(index);
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
                  <Button
                    onClick={() => {
                      resetData();
                      setAddNew(true);
                      onOpen();
                    }}
                  >
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
                          <Button
                            size="xs"
                            onClick={() => {
                              setDataKey(key);
                              setDataValue(field[key]);
                              setAddNew(false);
                              onOpen();
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="xs"
                            onClick={() => {
                              setDataKey(key);
                              setDataValue(field[key]);
                              warningModal.onOpen();
                            }}
                          >
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
      {ModalInputKeyValue(
        addNew,
        isOpen,
        customOnClose,
        dataKey,
        dataValue,
        setDataKey,
        setDataValue,
        onSubmit
      )}
      {ModalWarning(
        `${dataKey} : ${dataValue}`,
        warningModal.isOpen,
        warningModal.onClose,
        () => {
          deleteFieldData(
            user,
            db,
            currentInfo.collectionInfo,
            currentInfo.listInfo,
            dataKey,
            list,
            setList,
            listIndex
          );
        }
      )}
    </Flex>
  );
};
export default Admin;
