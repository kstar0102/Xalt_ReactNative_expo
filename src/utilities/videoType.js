const validYoutubeLink = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/;
    return regex.test(url);
  };
  
  const validVimeoLink = (url) => {
    const regex = /(http|https)?:\/\/(www\.)?vimeo.com\/(\d+)(?:|\/\?)/;
    return regex.test(url);
  };
  
  const convertYoutubeToEmbedded = (url) => {
    // Our regex pattern to look for a youTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //Match the url with the regex
    const match = url.match(regExp);
    //Return the result
    const video_id = match && match[2].length === 11 ? match[2] : undefined;
    if (!video_id) {
      return null;
    }
    return `https://youtube.com/embed/${video_id}`;
  };
  
  export { validVimeoLink, validYoutubeLink, convertYoutubeToEmbedded };
  