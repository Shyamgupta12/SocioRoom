import { MenuItem , Menu ,Avatar , Badge ,  Box , AppBar, Toolbar , styled , Typography, InputBase} from '@mui/material'
import { Mail, Notifications  } from "@mui/icons-material";
import React, { useState , useEffect} from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "50px",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  // Frontend code

  const [open , setOpen] = useState(false);
  const [input, setInput] = useState("");
   
  const fetchData = (value) => {
    fetch("http://localhost:3000/api/v1/getusernames")
      .then((response) => response.json())
      .then((json) => {
          if (Array.isArray(json)) {
              const results = json.filter((user) => {
                  return value && user && user.usernames && user.usernames.toLowerCase().includes(value);
              });
              console.log(results);
          } else {
              console.error("JSON response is not an array.");
          }
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });
}


  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }

  return (
   <AppBar position='sticky' >
     <StyledToolbar>
       <Typography variant='h6'  sx={{ display: { xs: "none", sm: "block" } }}>SOCIOROOM</Typography>
       <ConnectWithoutContactIcon   sx={{ display: { xs: "block", sm: "none" } }} />
      <Search><InputBase placeholder='search...' value={input} onChange={(e) => {handleChange(e.target.value)}}/></Search>
      <Icons>
            <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
      </Icons>
      <UserBox onClick={(e) => setOpen(true)}>
        <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            
        />
        <Typography variant="span">John</Typography>
      </UserBox>
    </StyledToolbar>
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      > 
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
    </Menu>
   </AppBar>
  )
}

export default Navbar
