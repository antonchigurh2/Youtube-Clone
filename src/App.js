import React from 'react';
import {Grid,Button} from '@material-ui/core';
import youtube from './api/youtube';
import {SearchBar,VideoDetail,VideoList} from './components'
// require('dotenv').config()

const key1 = process.env.YOUTUBE_API_KEY;

class App extends React.Component{
    state={
        videos:[],
        selectedVideo:null
    }
    componentDidMount(){
        this.handleSubmit("pickle rick")
    }
    onVideoSelect=(video)=>{
        this.setState({selectedVideo:video})
    }
    handleSubmit=async(searchTerm)=>{
        const response =await youtube.get('search',{   
             params:{
            part:'snippet',
            maxResults:3,
            key:key1,
            q:searchTerm,
        }});
        // key:'AIzaSyDVWt6qTig8ffaK8vwsMHi0tF2-jTMNaKI',
        this.setState({videos:response.data.items,selectedVideo:response.data.items[0]});
    }

    render(){
        const {selectedVideo,videos} =this.state;
        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Button variant="text">Text</Button>
                        </Grid> */}
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default App;