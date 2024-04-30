import { AppBar, Toolbar, styled, InputBase, Box } from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useAuthContext } from "../Contexts/AuthContext";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from 'react-bootstrap/Button';
import useLogout from '../hooks/useLogout'
import GmailLogo from '../assets/logo_gmail.png'




const Header = ({ toggleDrawer }) => {
  const { isLoggedIn, decodedToken,isExpired } = useAuthContext();
  const Email= decodedToken?decodedToken.email:"";
    const UserName=  decodedToken?decodedToken.name:"";
  
const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">{Email}</Popover.Header>
    <Popover.Body>
      <div>
    <AccountCircleOutlined style={{fontSize:"80px"}} color="action" />
    </div> <div style={{margin:"10px"}}>
      <span >Hi {UserName} !</span> 
      </div>
      <div>
      <Button  onClick={useLogout()} variant="primary"><LogoutIcon />Logout</Button>
      </div>
    </Popover.Body>
  </Popover>
);


  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuIcon color="action" onClick={toggleDrawer} cursor="pointer" />
        <img
          src={GmailLogo}
          alt="logo"
          style={{ width: 110, marginLeft: 15 }}
        />
        <SearchRapper>
          <Search color="action" />
          <InputBase placeholder="Search mail" />
          <Tune color="action" />
        </SearchRapper>

        <IconsWrapper>
          <HelpOutlineOutlined color="action" />
          <SettingsOutlined color="action" />
          <AppsOutlined color="action" />
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <AccountCircleOutlined color="action" />
          </OverlayTrigger>
        </IconsWrapper>
      </Toolbar>

      
    </StyledAppBar>
    
  );
};

export default Header;

const StyledAppBar = styled(AppBar)({
  background: "#F5F5F5",
  boxShadow: "none",
});

const SearchRapper = styled(Box)({
  background: "#EAF1FB",
  marginLeft: 80,
  borderRadius: 8,
  minWidth: 690,
  maxWidth: 720,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  "& > div": {
    width: "100%",
    padding: "0 10px",
  },
});

const IconsWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  gap: 20,
});
