import Inferno from '../../../../src';
import get from '../../../tools/get';

const {
	createElement
} = Inferno.TemplateFactory;

describe('SVG element tests (jsx)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		Inferno.render(null, container);
	});

     it('should remove arbitrary SVG hyphenated attributes', function() {
     
	  Inferno.render(<svg>the-word="the-bird"</svg>, container);
      // innerHTML shows this correctly
       expect(container.firstChild.hasAttribute('the-word')).to.equal(true);
	  Inferno.render(<svg></svg>, container);
       expect(container.firstChild.hasAttribute('the-word')).to.equal(false);
     });

     it('should remove arbitrary SVG camel case attributes', function() {

	  Inferno.render(<svg>the-word="the-bird"</svg>, container);
       expect(container.firstChild.hasAttribute('theWord')).to.equal(true);
       Inferno.render(<svg></svg>, container);
       expect(container.firstChild.hasAttribute('theWord')).to.equal(false);
     });
	 
	 
	 it('should update arbitrary hyphenated attributes for SVG tags', function() {
 
       var beforeUpdate = createElement('svg', {}, null);
       ReactDOM.render(beforeUpdate, container);
 
       var afterUpdate = <svg>the-word="the-bird"</svg>;
       Inferno.render(afterUpdate, container);
 
       expect(container.childNodes[0].getAttribute('the-word')).to.equal('the-bird');
     });
 
	 
	 it('should update namespaced SVG attributes', function() {
 
       var beforeUpdate = (
         <svg>
           <image xlinkHref="http://i.imgur.com/w7GCRPb.png" />
         </svg>
       );
       Inferno.render(beforeUpdate, container);
 
       var afterUpdate = (
         <svg>
           <image xlinkHref="http://i.imgur.com/JvqCM2p.png" />
         </svg>
       );
       Inferno.render(afterUpdate, container);
 
       expect(container.firstChild.firstChild.getAttributeNS(
         'http://www.w3.org/1999/xlink',
         'href'
       )).to.equal('http://i.imgur.com/JvqCM2p.png');
     });
	 
	 
});