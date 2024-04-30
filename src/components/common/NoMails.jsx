import { Box, Divider, Typography, styled } from "@mui/material";

const NoMails = ({ message }) => {
  return (
    <Component>
      <Typography>{message?.heading}</Typography>
      <Typography>{message?.subHeading}</Typography>
      <StyledDivider />
    </Component>
  );
};

export default NoMails;

const Component = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: 50,
  opacity: ".8",
  width: "100%",
});

const StyledDivider = styled(Divider)({
  width: "100%",
  marginTop: 10,
});
