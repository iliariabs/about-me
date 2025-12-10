import raylibBlackjackImg from '../assets/projectcarousel/raylibblackjack.png';
import aboutMeImg from '../assets/projectcarousel/aboutme.png';
import sofiatrafficmapImg from '../assets/projectcarousel/sofiatrafficmap.png';
import onlineinterpreterImg from '../assets/projectcarousel/onlineinterpreter.png';

export const projects = [
  {
    id: 1,
    title: "Sofia Bus & Trams Map",
    category: "Interactive Map",
    image: sofiatrafficmapImg,
    link: "https://iliariabs.github.io/sofia-traffic-map/"
  },
  {
    id: 2,
    title: "Online Client-Side Interpreter",
    category: "WASM & Frontend",
    image: onlineinterpreterImg,
    link: "https://iliariabs.github.io/client-scripts-online/"
  },
  {
    id: 3,
    title: "Raylib BlackJack",
    category: "Low-level & Graphics",
    image: raylibBlackjackImg,
    link: "https://github.com/iliariabs/Raylib-Blackjack"
  },
  { 
    id: 3,
    title: "About Me",
    category: "Landing Page",
    image: aboutMeImg,
    link: "https://iliariabs.github.io/about-me/"
  }
];
