import React from 'react';
import SodaIcon from '../../icons/soda.png';
import DrugsIcon from '../../icons/drugs.png';
import CigarIcon from '../../icons/cigar.png';
import CookieIcon from '../../icons/cookie.png';
import CandyIcon from '../../icons/candy.png';
import OtherIcon from '../../icons/question.png';

export default class Category {
  constructor(cat) {
    this.category = cat;
  }

  getIcon() {
    switch (this.category) {
      case 'GASEOSAS': return <img src={SodaIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      case 'ANALGESICOS': return <img src={DrugsIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      case 'CIGARRILLOS': return <img src={CigarIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      case 'GALLETITAS': return <img src={CookieIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      case 'GOLOSINAS': return <img src={CandyIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      default: return <img src={OtherIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
    }
  }
}
