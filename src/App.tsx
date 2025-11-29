import { ScrollProvider } from './libs/lenis';
import SlideWrapper from './components/SlideWrapper';
import RightSlideSelector from './components/RightSlideSelector';
import { TextImageSlideView } from './components/views/TextImageSlideView';
import { TitleSlideView } from './components/views/TitleSlideView';
import { TitleWhoSlideView } from './components/views/TitleWhoSlideView';
import { CarouselSlideView } from './components/views/CarouselSlideView';
import { slideData } from './data/slides';
import { PageHeader } from './components/PageHeader';
import { TechStackSlideView } from './components/views/TechStackSlideView';
import { ScrollDownIndicator } from './components/ScrollDownIndicator';
import { ContactSlideView } from './components/views/ContactSlideView';

function App() {
  return (
    <ScrollProvider>
      <PageHeader title="// About Me" />

      <main className="relative w-full bg-black text-green-400 min-h-screen">
        <RightSlideSelector slides={slideData.map(s => ({ id: s.id, title: s.title || s.id }))} />
        
        {slideData.map((slide, index) => (
          <SlideWrapper 
            key={slide.id} 
            index={index} 
            slideInstance={slide.instance}
            marginTop={slide.marginTop}
            marginBottom={slide.marginBottom}
            paddingY={slide.paddingY}
          >
            {slide.type === 'text-image' && (
              <TextImageSlideView
                title={slide.title!}
                subtitle={slide.subtitle!}
                description={slide.description!}
                imageUrl={slide.imageUrl!}
                imageLeft={slide.imageLeft}
              />
            )}

            {slide.type === 'title' && (
              <TitleSlideView
                title={slide.title!}
                subtitle={slide.subtitle!}
                description={slide.description!}
              />
            )}

            {slide.type === 'who' && (
              <TitleWhoSlideView
                title={slide.title!}
                subtitle={slide.subtitle!}
              />
            )}

            {slide.type === 'carousel' && (
              <CarouselSlideView
                title={slide.title!}
                items={slide.items!}
              />
            )}
            
            {slide.type === 'contact' && (
              <ContactSlideView
                title={slide.title!}
                subtitle={slide.subtitle!}
                contact={slide.contact!}
                icons={slide.icons!}
                imageUrl={slide.imageUrl!}
                imageLeft={slide.imageLeft}
              />
            )}
            {slide.type === 'techstack' && <TechStackSlideView />}
          </SlideWrapper>
        ))}


      </main>

      <ScrollDownIndicator />
    </ScrollProvider>
  );
}

export default App;