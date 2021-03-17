using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
    public class Player
    {
        public int Id { get; set; }
       
        public string Name { get; set; }
      
        public string SecondName { get; set; }
     
        public string Gender { get; set; }
       
        
        public string Birthday { get; set; }
      
       
        public int TeamId { get; set; }

    }
}
