const splitSentense = (sentense) => {
    const split = sentense.split('')
    const edit = split.map((letter,index) => {
      if (letter === ' ') {
        return <div key={`${letter}${index}`}>&nbsp;</div>;
      } else if (letter === '.') {
        return <div key={`${letter}${index}`} className='dot'>{letter}</div>;
      } else if (letter === '[' || letter === ']') {
        return <div key={`${letter}${index}`} className='dangdanghae'>{letter}</div>;
      } else {
        return <div key={`${letter}${index}`}>{letter}</div>;
      }
    });
    return edit;
}

export default splitSentense;