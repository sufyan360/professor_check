"use client"
import { Box, Stack, TextField, Button, Container, Typography} from "@mui/material";
import Link from 'next/link'; 
import Navbar from './navbar'

export default function Home() {

    return(
        <Box>
        <Navbar chat={false}/>
        <Box sx={{display:'flex', justifyContent:"center", alignItems: 'center', alignText: 'center', flexDirection: 'column', mt: '10vh', overflow: 'hidden', width:'100%'}}>
            <Box sx={{height: '90vh',display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #258786, white)',  width:'100%'}}>
                <Box sx ={{display:'flex',  alignItems: 'center', justifyContent:"center", textAlign: 'center', flexDirection: 'column', width: '60%'}}>
                    <Typography sx={{color: 'white', fontWeight: 'bold', fontSize:'3vw'}}>
                        Find Your Ideal Professor Instantly
                    </Typography>
                    <Typography sx={{color: 'white', fontWeight: '500', fontSize:'1.5vw'}}>
                        Let our AI Chatbot match you with the best profesors based on your preferences and needs
                    </Typography>
                    <Link href="/chatbot" passHref>
                        <Button sx={{borderRadius: 25, backgroundColor: 'white', mt:5, color: '#ca7558', fontWeight: 600, p: 1, '&:hover':{color: 'white', backgroundColor: '#ca7558'}}}>Chat With Our Bot</Button>
                    </Link>
                </Box>
            </Box>
            <Box sx ={{ height: '100vh', width: '100vw', display:'flex', justifyContent:"space-evenly", alignItems: 'center', textAlign: 'center', flexDirection: 'column', bgcolor: 'white'}} id="howItWorks">
                <Box
                    sx={{
                        height: '5%',
                        display: 'flex',
                        alignItems: 'center', // Center vertically
                        justifyContent: 'center', // Center horizontally
                        textAlign: 'center',
                        mt: '10vh',
                    }}>
                    <Typography align='center' sx={{color: '#ca7558', fontSize: "2vw", fontWeight: 'bold'}}>
                        How it works?
                    </Typography>
                </Box>
                <Box sx={{display:'flex', mt: 4, gap: '6%', alignItems: 'center', textAlign: 'center', height: '95%', flexDirection: 'column', width: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'linear-gradient(180deg, #9ec2b6, #258786)', height: '20%', borderRadius: 7, width: '40%', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.2)', p: '6% 3%'}}>
                        <Box sx={{textAlign: 'left', display:'flex', alignItems:'center', justifyContent: 'center', height: '100%', width: '80%', ml:'10%'}}>
                            <Typography sx={{color:'white', fontSize: "1.5vw"}}>
                                Step 1: <span style={{fontWeight: 'bold'}}>Input Your Preferences. </span>
                                <br/> <span style={{fontSize:'1.2vw'}}>Choose criteria like teaching style, course type, feedback, etc...</span>
                            </Typography>
                        </Box>
                        <Box
                        component="img"
                        src="criteria.png"
                        alt="checklist"
                        sx={{
                            width: '30%',
                            borderRadius: 50, 
                            height: '20vh',  
                            objectFit: 'contain',
                            backgroundColor: 'transparent'
                        }}
                    />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'linear-gradient(180deg, #9ec2b6, #258786)', height: '20%', borderRadius: 7, width: '40%', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.2)', p: '6% 3%'}}>
                        <Box sx={{textAlign: 'left', display:'flex', alignItems:'center', justifyContent: 'center', height: '100%', width: '80%', ml:'10%'}}>
                            <Typography sx={{color:'white', fontSize: "1.5vw"}}>
                                Step 2: <span style={{fontWeight: 'bold'}}> Chat With Our AI.</span>
                                <br/> <span style={{fontSize:'1.2vw'}}>Interact our AI chatbot.</span>
                            </Typography>
                        </Box>
                        <Box
                        component="img"
                        src="ai.webp"
                        alt="ai"
                        sx={{
                            width: '30%', 
                            height: '20vh',  
                            objectFit: 'contain',
                            backgroundColor: 'transparent'
                        }}
                    />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'linear-gradient(180deg, #9ec2b6, #258786)', height: '20%', borderRadius: 7, width: '40%', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.2)', p: '6% 3%'}}>
                        <Box sx={{textAlign: 'left', display:'flex', alignItems:'center', justifyContent: 'center', height: '100%', width: '80%', ml:'10%'}}>
                            <Typography sx={{color:'white', fontSize: "1.5vw"}}>
                                Step 3: <span style={{fontWeight: 'bold'}}>Get Your Recommendations.</span>
                                <br/> <span style={{fontSize:'1.2vw'}}>Receive a personalized list of professors matching your needs. </span>
                            </Typography>
                        </Box>
                    <Box
                        component="img"
                        src="professor.png"
                        alt="professor"
                        sx={{
                            width: '30%', 
                            height: '20vh',  
                            objectFit: 'contain',
                            backgroundColor: 'transparent'
                        }}
                    />
                    </Box>
                </Box>
            </Box>
            <Box sx ={{ height: '100vh', display:'grid', justifyContent:"space-evenly", alignItems: 'center', textAlign: 'center', flexDirection: 'column', background: 'linear-gradient(180deg, white, #258786)'}} id='features'>
            <Box
                    sx={{
                        height: '10vh',
                        display: 'flex',
                        alignItems: 'center', // Center vertically
                        justifyContent: 'center', // Center horizontally
                        textAlign: 'center',
                    }}>
                    <Typography align='center' sx={{color: '#ca7558', fontSize: "2vw", fontWeight: 'bold'}}>
                        Key Features
                    </Typography>
                </Box>
                <Box sx={{display:'flex', justifyContent:"space-evenly", alignItems: 'center', textAlign: 'center', gap: 4, height: '90%'}}>
                    <Box sx={{textAlign: 'center', bgcolor: 'white', height: '50%', borderRadius: 7, width: '22%', display:'flex', alignItems:'center', justifyContent: 'center', p: '1% 3%', boxShadow: '4px 8px 12px rgba(0, 0, 0, 0.2)'}}>
                        <Typography sx={{color:'#ca7558', fontSize: "1.8vw"}}>
                            <span style={{fontWeight: 'bold'}}>AI-Powered Matching</span>
                            <br/> <span style={{fontSize:'1.2vw', color: '#2a416a'}}> Advanced AI technology to provide personalized recommendations. </span>
                        </Typography>
                    </Box>
                    <Box sx={{textAlign: 'center', bgcolor: 'white', height: '50%', borderRadius: 7, width: '22%', display:'flex', alignItems:'center', justifyContent: 'center', p: '1% 3%', boxShadow: '4px 8px 12px rgba(0, 0, 0, 0.2)'}}>
                        <Typography sx={{color:'#ca7558', fontSize: "1.8vw"}}>
                            <span style={{fontWeight: 'bold'}}>Extensive Database</span>
                            <br/> <span style={{fontSize:'1.2vw', color: '#2a416a'}}>Access to a wide range of professors across various departments.</span>
                        </Typography>
                    </Box>
                    <Box sx={{textAlign: 'center', bgcolor: 'white', height: '50%', borderRadius: 7, width: '22%', display:'flex', alignItems:'center', justifyContent: 'center', p: '1% 3%', boxShadow: '4px 8px 12px rgba(0, 0, 0, 0.2)'}}>
                        <Typography sx={{color:'#ca7558', fontSize: "1.8vw"}}>
                            <span style={{fontWeight: 'bold'}}>Customizable Criteria</span>
                            <br/> <span style={{fontSize:'1.2vw', color: '#2a416a'}}>Ability to refine your search based on multiple factors.</span>
                        </Typography>
                    </Box>
                    <Box sx={{textAlign: 'center', bgcolor: 'white', height: '50%', borderRadius: 7, width: '22%', display:'flex', alignItems:'center', justifyContent: 'center', p: '1% 3%', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.2)'}}>
                        <Typography sx={{color:'#ca7558', fontSize: "1.8vw"}}>
                            <span style={{fontWeight: 'bold'}}>24/7 Availability</span>
                            <br/> <span style={{fontSize:'1.2vw', color: '#2a416a'}}>Always ready to assist you with finding the perfect professor.</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box  sx={{height: '80vh',display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', background: 'linear-gradient(to bottom, #258786, #ca7558)', width: '100vw'}}>
                <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '2vw'}}>
                Always ready to assist you with finding the perfect professor.
                </Typography>
                
                <Link href="/chatbot" passHref>
                    <Button sx={{bgcolor: '#2a416a', color: 'white', fontSize: '1vw', fontWeight: 700, borderRadius: 15, mt:3, p: 1.5, '&:hover': {bgcolor: '#ca7558'}}}>
                        Get Started Today
                    </Button>
                </Link>
            </Box>
            <Box sx={{height:'10vh', bgcolor:'#9ec2b6', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Typography sx={{color: 'white'}}>&copy; 2024 Check My Professor</Typography>
            </Box>
        </Box>
    </Box>
)}