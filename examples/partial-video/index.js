var vrView;
var playButton;
var muteButton;

function onLoad () {
  // Load VR View.
  vrView = new VRView.Player('#vrview', {
    width: '100%',
    height: 480,
    image: 'examples/partial-video/bezares_4096.jpg',
    video: 'examples/partial-video/bezares_4096.mp4',
    dome_up: 'examples/partial-video/bezares_domeUp_4096.jpg',
    dome_down: 'examples/partial-video/bezares_domeDown_4096.jpg',
    is_stereo: true,
    is_video_sideBySide: true,
    is_debug: true,
    // default_heading: 90,
    // is_yaw_only: true,
    is_autopan_off: true,
    // is_vr_off: true,
    // [phiStart, phiLenght, thetaStart, thetaLenght]
    // params normalized
    sweep: [0.41689, 0.16648, 0.09995, 0.29980]
  // Provisional directly on radians
  // sweep: [0, 1.57, 0.785, 0.785]
  });
  vrView.on('ready', onVRViewReady);

  playButton = document.querySelector('#toggleplay');
  muteButton = document.querySelector('#togglemute');

  playButton.addEventListener('click', onTogglePlay);
  muteButton.addEventListener('click', onToggleMute);
}

function onVRViewReady () {
  console.log('vrView.isPaused', vrView.isPaused);
  console.log(vrView);
  // Set the initial state of the buttons.
  if (vrView.isPaused) {
    playButton.classList.add('paused');
  } else {
    playButton.classList.remove('paused');
  }
}

function onTogglePlay () {
  if (vrView.isPaused) {
    vrView.play();
    playButton.classList.remove('paused');
  } else {
    vrView.pause();
    playButton.classList.add('paused');
  }
}

function onToggleMute () {
  var isMuted = muteButton.classList.contains('muted');
  if (isMuted) {
    vrView.setVolume(1);
  } else {
    vrView.setVolume(0);
  }
  muteButton.classList.toggle('muted');
}

window.addEventListener('load', onLoad);
