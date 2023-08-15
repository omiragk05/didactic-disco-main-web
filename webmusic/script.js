new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: 
      [
        {
          name: "Song Radio",
          artist: "Now Playing",
          cover: "webmusic/img/sinhala.jpg",
          source: "https://stream.zeno.fm/1tcs4fbw7rquv",
          url: "https://omirageevin.me",
          favorited: false
        },
	      {
          name: "Calming Music",
          artist: "Now Playing",
          cover: "webmusic/img/1.jpg",
          source: "https://stream.zeno.fm/ty952pfa8f0uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Lofi live",
          artist: "Now Playing",
          cover: "webmusic/img/4.jpg",
          source: "https://stream.laut.fm/lofi?ref=radiode",
          url: "https://omirageevin.me",
          favorited: false
        },
		
		
		{
          name: "Neth FM",
          artist: "Now Playing",
          cover: "webmusic/img/7.jpg",
          source: "https://stream.zeno.fm/emgkfd4f4p8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
	
		{
          name: "Shree FM",
          artist: "Now Playing",
          cover: "webmusic/img/9.jpg",
          source: "https://stream.zeno.fm/g4n6x9xv0p8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Sirasa FM",
          artist: "Now Playing",
          cover: "webmusic/img/10.jpg",
          source: "https://stream.zeno.fm/df20w9rv0p8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Sitha FM",
          artist: "Now Playing",
          cover: "webmusic/img/11.jpg",
          source: "https://stream.zeno.fm/a6nynkrv0p8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Vesak Radio",
          artist: "Now Playing",
          cover: "webmusic/img/15.jpg",
          source: "https://stream.zeno.fm/5cszcxtfyy8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Songs By Bathiya and Santhush",
          artist: "BNS",
          cover: "webmusic/img/16.jpg",
          source: "https://stream.zeno.fm/88sybqwhwtzuv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Songs By Shashika Nisansala",
          artist: "Shashika Nisansala",
          cover: "webmusic/img/17.jpg",
          source: "https://stream.zeno.fm/6r4et9thwtzuv",
          url: "https://omirageevin.me",
          favorited: false
        },
		{
          name: "Songs By Alan Walker",
          artist: "Alan Walker",
          cover: "webmusic/img/18.jpg",
          source: "https://stream.zeno.fm/kv9nt7z7vv8uv",
          url: "https://omirageevin.me",
          favorited: false
        },
		
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
