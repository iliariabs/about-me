import { TextImageSlide } from '../slides/TextImageSlide';
import { projects } from './projects';
import { roles } from './roles';
import { CarouselSlide } from '../slides/CarouselSlide';
import { TechStackSlide } from '../slides/TechStackSlide';
import type { SlideConfig } from './slideconfig';
import { TitleWhoSlide } from '../slides/TitleWhoSlide';
import { ContactSlide } from '../slides/ContactSlide';

import dicaprio from '../assets/textimage/dicapriodjango.png';
import greengoblin from '../assets/textimage/greengoblin.png';
import patrickvisit from '../assets/textimage/patrickvisit.png';
import githubIcon from '../assets/icons/github.svg';

export const slideData: SlideConfig[] = [
  {
    id: 'who',
    type: 'who',
    title: 'Hello There!',
    subtitle: 'Scroll Down',
    instance: new TitleWhoSlide('who', roles),
  },
  {
    id: 'architect',
    type: 'text-image',
    title: 'A bit about me..',
    subtitle: 'Pixel-perfect craftsman • Low Level Sorcerer',
    description: ['I create elegant, modular, and reliable solutions — from low-level engines to carefully crafted interfaces. And yes, I love to code.'],
    imageUrl: dicaprio,
    imageLeft: false,
    marginBottom: '50vh',
    instance: new TextImageSlide('architect', false)
  },
  {
    id: 'vision',
    type: 'text-image',
    title: 'Philosophy',
    subtitle: "I'm something of a scientist myself.",
    description: [
      'Following SOLID principles and clean-code practices allows me to create systems that are predictable, scalable, and easy to evolve.',
      'For me, engineering and design go hand in hand: clean structure under the hood, clean aesthetics on the surface.',
    ],
    imageUrl: greengoblin,
    imageLeft: true,
    marginBottom: '50vh',
    instance: new TextImageSlide('vision', true)
  },
  {
    id: 'Tech Stack',
    type: 'techstack',
    marginBottom: '50vh',
    instance: new TechStackSlide('Tech Stack')
  },
  {
    id: 'carousel',
    type: 'carousel',
    title: 'Selected Works',
    items: projects,
    marginBottom: '20vh',
    instance: new CarouselSlide('carousel')
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Contact Links',
    subtitle: 'That was my card. What do you think?',
    contact: {
      email: 'ilia.riabtsev@protonmail.com',
      extra: 'Available for questions, freelance & collaboration'
    },
    icons: [
      { id: 'github', href: 'https://github.com/iliariabs', src: githubIcon, alt: 'GitHub' }
    ],
    imageUrl: patrickvisit,
    imageLeft: false,
    instance: new ContactSlide('contact', false)
  }
];
