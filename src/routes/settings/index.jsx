import { createFileRoute } from '@tanstack/react-router'
import EntityForm from '../../components/modal/EntityForm'
import { getEntityStore } from '../../store';
import { useEffect } from 'react';
// import EntityTable from '../../components/table/EntitiyTable'

const Settings = () => {
  const entityKey = 'settings'

  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  useEffect(() => {
    handleFormDialogOpen('edit', 1)
  }, [handleFormDialogOpen]);


  return <EntityForm entityKey={entityKey} />
}

export default Settings

export const Route = createFileRoute('/settings/')({
  component: () => <Settings />,
})
