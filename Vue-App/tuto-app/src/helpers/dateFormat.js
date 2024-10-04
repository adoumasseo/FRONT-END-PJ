export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
  
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  };
  