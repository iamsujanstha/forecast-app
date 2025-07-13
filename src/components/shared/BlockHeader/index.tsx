import { styled, Typography } from "@mui/material";

const BlockHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'uppercase',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default BlockHeader;