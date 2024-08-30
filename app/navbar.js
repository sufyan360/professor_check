import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Link as ScrollLink} from 'react-scroll'; 
import Link from 'next/link'; 

export default function Navbar(props) {

    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    return (
        <AppBar position="absolute" 
            sx={{
                width: '100%',
                bgcolor: '#2a416a',
                zIndex: (theme) => theme.zIndex.appBar,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                height: '10vh',
                display: 'flex',
                width: '100vw',
                position: 'fixed',
                flexDirection: 'column', 
                justifyContent: 'center',
            }}>
            <Toolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}>
                <Typography 
                    onClick={handleClick} 
                    variant="h6" 
                    sx={{ display: 'flex', cursor: 'pointer', fontWeight: 700}}>
                    Check My Professor
                </Typography>
                <Box>
                    {!props.chat ? (
                <>
                <ScrollLink to="howItWorks" spy={true} smooth={true} duration={500}>
                    <Button sx ={{borderRadius: 25, fontWeight: 500, bgcolor: '#258786', color: 'white','&:hover': {color: '#258786', bgcolor: 'white'}}}>How It Works</Button>
                </ScrollLink>
                <ScrollLink to="features" spy={true} smooth={true} duration={500}>
                    <Button sx ={{borderRadius: 25, fontWeight: 500, bgcolor: '#258786', color: 'white', ml: 2, '&:hover': {color: '#258786', bgcolor: 'white'}}}>Features</Button>
                </ScrollLink>
                <Link href="/chatbot" passHref>
                    <Button sx ={{color: 'white', ml: 1, fontWeight: 'bold', '&:hover': {color: '#ca7558'}}}>
                        Chat with our Bot
                    </Button>
                </Link> 
                </>)
                :(<> </>)}
                </Box>
            </Toolbar>
        </AppBar>
    );
}