import { createFileRoute } from '@tanstack/react-router'
import EntityTable from '../../components/table/EntitiyTable'
import { useFetchGeneralInfo } from '../../useManagement'
import SingleLoader from '../../components/general/SingleLoader'

const Terms = () => {
  const entityKey = 'terms'

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchGeneralInfo(entityKey)

  if (infoIsLoading) {
    return <SingleLoader icon={entityKey} size={34} />
  }

  const columnsConfig = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'name', headerName: 'Nazwa', flex: 300 },
    {
      field: 'products',
      headerName: 'Produkty',
      flex: 700,
      type: 'limitedChips',
      sortable: false,
    },
    {
      field: 'logic_blocks',
      headerName: 'Warunki',
      flex: 700,
      type: 'limitedChips',
      sortable: false,
      description: infoData.logic_blocks.description,
    },
  ]

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />
}

export default Terms

export const Route = createFileRoute('/terms/')({
  component: () => <Terms />,
})
