import {Box, Typography} from '@mui/material';

const Partners = () => {
    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',padding:'30px'}} spacing={2}>
            <Typography variant='h6' sx={{fontSize:'30px', fontWeight:'bold', fontFamily:'Poppins, Arial'}}>Who are our partners?</Typography>
            {/* <Box sx={{display:'flex', flexDirection:'row'}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='body1'>HUGO BOSS</Typography>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='subtitile'>HUGO BOSS</Typography>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='subtitile'>HUGO BOSS</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h6'>BARCLAYS</Typography>
                    <Typography variant='h6'>BARCLAYS</Typography>
                    <Typography variant='h6'>BARCLAYS</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h6'>sky</Typography>
                    <Typography variant='h6'>sky</Typography>
                    <Typography variant='h6'>sky</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h6'>SAMSUNG</Typography>
                    <Typography variant='h6'>SAMSUNG</Typography>
                    <Typography variant='h6'>SAMSUNG</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='subtitile'>HUGO BOSS</Typography>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='subtitile'>HUGO BOSS</Typography>
                    <Typography variant='h6'>Boss</Typography>
                    <Typography variant='p' component='subtitile'>HUGO BOSS</Typography>
                </Box>
            </Box> */}
            <Box>
                <Box component='img' src='https://res.cloudinary.com/dhczdaczx/image/upload/v1710910698/n7sku215yl7zrjkoktkt.png'/>
            </Box>
        </Box>
    )
}

export default Partners;