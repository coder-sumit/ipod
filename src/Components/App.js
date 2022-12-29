import React, { Component } from 'react';
import IpodControls from './IpodControls';
import Screen from './Screen';
import ZingTouch from 'zingtouch';

class App extends Component {
  constructor(props) {
    super(props);
    this._currentSelected = null;
    this._IPOD = 'iPod';
    this._COVERFLOW = 'coverflow';
    this._MUSIC = 'music';
    this._PLAYER = 'player';
    this._GAMES = 'games';
    this._SETTINGS = 'settings';
    this._ABOUT = 'about';
    this._prevCoverflowAngle = 0;
    this._prevSongAngle = 0

    // iPod State
    this.state = {
      visibleComponent: {
        displayHome: true,
        displayCoverflow: false,
        displayMusic: false,
        displayGames: false,
        displaySettings: false,
        displayAbout: false
      },
      albums: [null],
      songs: [null],
      activeCoverflow: 0,
      activeSongId: 0,
      isMusicPlayerActive: false,
      isMusicPlaying: false,
      pageTitle: 'iPod'
    }
  }

  componentDidMount() {
    this.target = document.getElementById('circle');

    this.zingWheel = new ZingTouch.Region(this.target);
    this.currentAngle = 0;
    // Make API CALL "Reading data from local stored album_data.json"
    fetch('album_data.json')
      .then(result => {
        return result.json()
      })
      .then(res => {
        let albums = []
        res.results.forEach(album => {
          const data = {
            albumId: album.id,
            albumName: album.name,
            artistName: album.artistName,
            artworkURL: album.artworkUrl100,
            albumURL: album.url
          }
          albums.push(data);
        });
        this.setState({
          albums: albums
        });
      })
      .catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });

    // Make API CALL "Reading data from local stored music_data.json"
    fetch('music_data.json')
      .then(result => {
        return result.json()
      })
      .then(res => {
        let songs = []
        res.songs.forEach(song => {
          const data = song;
          songs.push(data);
        });
        this.setState({
          songs: songs
        });
        // console.log('SONGS ARR LENGTH', this.state.songs.length);
      })
      .catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });

  }

  setSelectState = (selected) => {
    const coverflow = document.getElementById(this._COVERFLOW);
    const music = document.getElementById(this._MUSIC);
    const games = document.getElementById(this._GAMES);
    const settings = document.getElementById(this._SETTINGS);
    const about = document.getElementById(this._ABOUT);
    coverflow.classList = music.classList = games.classList = settings.classList = about.classList = "option";
    const selectedElement = document.getElementById(selected);
    selectedElement.classList.add('selected');
    this._currentSelected = selected;
  }
  handleRotateWheel = (props) => {
    // const target = document.getElementById('circle');

    // const zingWheel = new ZingTouch.Region(target);
    // this.currentAngle = 0;
    this.zingWheel.bind(this.target, 'rotate', (e) => {
      this.currentAngle += e.detail.distanceFromLast;
      const myAngle = Math.round(this.currentAngle % 360);
      if (this.state.visibleComponent.displayHome) {
        if (((myAngle < 72 && myAngle >= 0) || (myAngle <= 0 && myAngle > -72))) {
          this.setSelectState(this._COVERFLOW);
        }
        if (((myAngle < 144 && myAngle >= 72) || (myAngle <= -72 && myAngle > -144))) {
          this.setSelectState(this._MUSIC);
        }
        if (((myAngle < 216 && myAngle >= 144) || (myAngle <= -144 && myAngle > -216))) {
          this.setSelectState(this._GAMES);
        }
        if (((myAngle < 288 && myAngle >= 216) || (myAngle <= -216 && myAngle > -288))) {
          this.setSelectState(this._SETTINGS);
        }
        if (((myAngle < 360 && myAngle >= 288) || (myAngle <= -288 && myAngle > -360))) {
          this.setSelectState(this._ABOUT);
        }
      }
      else if (this.state.visibleComponent.displayCoverflow) {
        if (Math.abs(this._prevCoverflowAngle - myAngle) >= 50) {
          if (e.detail.distanceFromLast > 0) {
            this.increaseActive();
          } else {
            this.decreaseActive();
          }
          this._prevCoverflowAngle = myAngle;
        }
      }
      else if (this.state.visibleComponent.displayMusic && !this.state.isMusicPlayerActive) {
        if (Math.abs(this._prevSongAngle - myAngle) >= 50) {
          if (e.detail.distanceFromLast > 0) {
            this.increaseActiveSong();
          } else {
            this.decreaseActiveSong();
          }
          this._prevSongAngle = myAngle;
        }
      }

    })
  }

  handleMenuClick = (props) => {
    if (this.state.visibleComponent.displayHome) {
      console.log('menu clicked');
      return;
    }
    if (this.state.visibleComponent.displayCoverflow) {
      console.log('CoverFlowMenu clicked');
      this.setState({
        visibleComponent:
        {
          displayHome: !this.state.visibleComponent.displayHome,
          displayCoverflow: !this.state.visibleComponent.displayCoverflow,
          displayMusic: false,
          displayGames: false,
          displaySettings: false,
          displayAbout: false
        },
        pageTitle: this._IPOD
      });
    }
    if (this.state.visibleComponent.displayMusic) {
      if (this.state.isMusicPlayerActive) {
        this.setState({
          isMusicPlayerActive: false
          // ,         isMusicPlaying: !this.state.isMusicPlaying
        })
      }
      else {
        console.log('MusicMenu clicked');
        this._currentSelected = this._COVERFLOW;
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: false,
            displayMusic: !this.state.visibleComponent.displayMusic,
            displayGames: false,
            displaySettings: false,
            displayAbout: false
          },
          pageTitle: this._IPOD
        });
      }
    }
    if (this.state.visibleComponent.displayGames) {
      console.log('GAMES clicked');
      this._currentSelected = this._COVERFLOW;
      this.setState({
        visibleComponent:
        {
          displayHome: !this.state.visibleComponent.displayHome,
          displayCoverflow: false,
          displayMusic: false,
          displayGames: false,
          displaySettings: false,
          displayAbout: false
        },
        pageTitle: this._IPOD
      });
    }
    if (this.state.visibleComponent.displaySettings) {
      console.log('SETTINGS clicked');
      this._currentSelected = this._COVERFLOW;
      this.setState({
        visibleComponent:
        {
          displayHome: !this.state.visibleComponent.displayHome,
          displayCoverflow: false,
          displayMusic: false,
          displayGames: false,
          displaySettings: false,
          displayAbout: false
        },
        pageTitle: this._IPOD
      });
    }
    if (this.state.visibleComponent.displayAbout) {
      console.log('ABOUT clicked');
      this._currentSelected = this._COVERFLOW;
      this.setState({
        visibleComponent:
        {
          displayHome: !this.state.visibleComponent.displayHome,
          displayCoverflow: false,
          displayMusic: false,
          displayGames: false,
          displaySettings: false,
          displayAbout: false
        },
        pageTitle: this._IPOD
      });
    }
  }

  handleCenterBtnClick = (props) => {

    if (this.state.visibleComponent.displayHome) {
      if (this._currentSelected === this._COVERFLOW) {
        const title = this.setPageTitle(this._COVERFLOW);
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: !this.state.visibleComponent.displayCoverflow,
            displayMusic: false,
            displayGames: false,
            displaySettings: false,
            displayAbout: false
          },
          pageTitle: title
        });
      }
      if (this._currentSelected === this._MUSIC) {
        const title = this.setPageTitle(this._MUSIC);
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: false,
            displayMusic: true,
            displayGames: false,
            displaySettings: false,
            displayAbout: false
          },
          pageTitle: title
        });
      }
      if (this._currentSelected === this._GAMES) {
        const title = this.setPageTitle(this._GAMES);
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: false,
            displayMusic: false,
            displayGames: true,
            displaySettings: false,
            displayAbout: false
          },
          pageTitle: title
        });
      }
      if (this._currentSelected === this._SETTINGS) {
        const title = this.setPageTitle(this._SETTINGS);
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: false,
            displayMusic: false,
            displayGames: false,
            displaySettings: true,
            displayAbout: false
          },
          pageTitle: title
        });
      }
      if (this._currentSelected === this._ABOUT) {
        const title = this.setPageTitle(this._ABOUT);
        this.setState({
          visibleComponent:
          {
            displayHome: !this.state.visibleComponent.displayHome,
            displayCoverflow: false,
            displayMusic: false,
            displayGames: false,
            displaySettings: false,
            displayAbout: true
          },
          pageTitle: title
        });
      }
    }
    else if (this.state.visibleComponent.displayCoverflow) {
      const url = "this.state.albums[this.state.activeCoverflow].albumURL";
      window.open(url, '_blank');
    }
    else if (this.state.visibleComponent.displayMusic) {
      if (!this.state.isMusicPlayerActive) { //if musicplayer is not active then only activate it..else use center button click for play pause song
        this.setState({
          isMusicPlayerActive: true,
          isMusicPlaying: !this.state.isMusicPlaying
        })
      }
      else {
        this.setState({
          isMusicPlaying: !this.state.isMusicPlaying
        })
      }
    }
    else if (this.state.visibleComponent.displayAbout) {
      const url = "https://www.linkedin.com/in/aakashkandhari/";
      window.open(url, '_blank');
    }
  }

  handlePlayPauseClick = () => {
    if (this.state.visibleComponent.displayMusic && this.state.isMusicPlayerActive) {
      this.setState({
        isMusicPlaying: !this.state.isMusicPlaying
      })
    }
  }

  handleNextClick = () => {
    if (this.state.visibleComponent.displayMusic && this.state.isMusicPlayerActive) {
      this.increaseActiveSong();
    }
  }
  handlePrevClick = () => {
    if (this.state.visibleComponent.displayMusic && this.state.isMusicPlayerActive) {
      this.decreaseActiveSong();
    }
  }

  increaseActive = () => {
    let active = this.state.activeCoverflow + 1;
    const length = this.state.albums.length;
    if (active > length) active = 0;
    this.setState({
      activeCoverflow: active
    });
  };

  decreaseActive = () => {
    let active = this.state.activeCoverflow - 1;
    const length = this.state.albums.length;
    if (active < 0) active = length - 1;
    this.setState({
      activeCoverflow: active
    });
  };

  increaseActiveSong = () => {
    let songId = this.state.activeSongId + 1;
    const length = this.state.songs.length;
    if (songId > length - 1) songId = 0;
    this.setState({
      activeSongId: songId
    });
  };

  decreaseActiveSong = () => {
    let songId = this.state.activeSongId - 1;
    const length = this.state.songs.length;
    if (songId < 0) songId = length - 1;
    this.setState({
      activeSongId: songId
    });;
  };
  setPageTitle = (input) => {
    const title = input.charAt(0).toUpperCase() + input.slice(1);
    return title;
  }
  render() {
    return (
      <div className="ipod">
        <Screen currentState={this.state} />
        <IpodControls
          onRotate={this.handleRotateWheel}
          onMenuClick={this.handleMenuClick}
          onCenterBtnClick={this.handleCenterBtnClick}
          onNextClick={this.handleNextClick}
          onPrevClick={this.handlePrevClick}
          onPlayPauseClick={this.handlePlayPauseClick}
        />
      </div>
    );
  }
}

export default App;
