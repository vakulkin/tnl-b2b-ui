import { createFileRoute } from '@tanstack/react-router'
import EntityTable from '../../components/table/EntitiyTable'
// import { useFetchGeneralInfo } from '../../useManagement'
// import SingleLoader from '../../components/general/SingleLoader'

const Groups = () => {
  const entityKey = 'kits'

  // const { data: infoData, isLoading: infoIsLoading } =
  //   useFetchGeneralInfo(entityKey)

  // if (infoIsLoading) {
  //   return <SingleLoader icon={entityKey} size={34} />
  // }

  const columnsConfig = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'name', headerName: 'Nazwa', flex: 300 },
    {
      field: 'roles',
      headerName: 'Role',
      flex: 700,
      type: 'limitedChips',
      sortable: false,
      // description: infoData.logic_blocks.description,
    },
    {
      field: 'products',
      headerName: 'Products',
      flex: 700,
      type: 'limitedChips',
      sortable: false,
      // description: infoData.logic_blocks.description,
    },
    {
      field: 'edit',
      headerName: 'Edytuj',
      flex: 100,
      type: 'action',
      action: 'edit',
      sortable: false,
    },
    {
      field: 'delete',
      headerName: 'Usuń',
      flex: 100,
      type: 'action',
      action: 'delete',
      sortable: false,
    },
  ]

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />
}

export default Groups

export const Route = createFileRoute('/product-kits/')({
  component: () => <Groups />,
})
