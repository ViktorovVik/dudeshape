import MobileMenu from './modules/MobileMenu';
import { SliderCollection } from './modules/Slider';
import Favorites from './modules/Favorites';
import { TabsCollection } from './modules/Tabs';
import { FurnitureCollection } from './modules/Furniture';
import { NewsletterCollection } from "./modules/Newsletter";
import { FooterAccordionCollection } from "./modules/FooterAccordion";
import 'swiper/css';
import './styles/index.scss';

new MobileMenu();
new SliderCollection();
new Favorites();
new TabsCollection();
new FurnitureCollection();
new NewsletterCollection();
new FooterAccordionCollection();