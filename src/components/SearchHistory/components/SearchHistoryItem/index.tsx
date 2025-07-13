import { IconButton, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";

type SearchHistoryItemProps = {
  history: string[];
  option: string;
  handleDelete: (city: string) => void;
};

const StyledWrapper = styled("li")`
	display: flex;
	width: 100%,
	align-items: center,
	justify-content: space-between;
	&.MuiAutocomplete-option {
		justify-content: space-between;
	}
`;

function SearchHistoryItem({ history, option, handleDelete, ...props }: SearchHistoryItemProps) {

  return (
    <StyledWrapper {...props}>
      <Typography>{option}</Typography>
      {history.includes(option) && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(option);
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </StyledWrapper>
  );
}

export default memo(SearchHistoryItem);
