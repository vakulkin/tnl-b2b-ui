import { Stack } from "@mui/material";
import { getEntityStore } from "../../store";
import { useFetchInfoByKey } from "../../useManagement";
import EntityIcon from "../general/EntityIcon";
import NoItemsChip from "./NoItemsChip";
import ItemChip from "./ItemChip";

const LimitedChips = ({
  items,
  maxVisibleItems = 1,
  entityKey,
  entity,
  attachmentKey,
  prefix = "",
  postfix = "",
  emptyIcon = false,
  totalSymbols = 170,
}) => {
  const useStore = getEntityStore(entityKey);
  const handleFormDialogOpen = useStore((state) => state.handleFormDialogOpen);

  const itemCount = items.length;
  const visibleItems = items.slice(0, maxVisibleItems);
  const remainingCount = itemCount - visibleItems.length;

  const { data: infoData, isLoading, error } = useFetchInfoByKey(attachmentKey);

  if (isLoading) {
    return <EntityIcon icon={attachmentKey} size={14} />;
  }

  if (error) {
    return "Error loading data.";
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={0.5}>
      {itemCount === 0 ? (
        <NoItemsChip
          infoData={infoData}
          emptyIcon={emptyIcon}
          handleFormDialogOpen={handleFormDialogOpen}
          entity={entity}
          attachmentKey={attachmentKey}
        />
      ) : (
        visibleItems.map((item, index) => (
          <ItemChip
            key={item.id}
            item={item}
            index={index}
            visibleItems={visibleItems}
            items={items}
            remainingCount={remainingCount}
            infoData={infoData}
            handleFormDialogOpen={handleFormDialogOpen}
            entity={entity}
            attachmentKey={attachmentKey}
            totalSymbols={totalSymbols}
            prefix={prefix}
            postfix={postfix}
          />
        ))
      )}
    </Stack>
  );
};

export default LimitedChips;
