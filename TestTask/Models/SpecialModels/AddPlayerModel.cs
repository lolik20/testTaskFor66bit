using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
    public class AddPlayerModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string SecondName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string Birthday { get; set; }
        [StringLength(15, MinimumLength = 3,
       ErrorMessage = "Минимум 3 и максимум 15 символов")]
        [Required]
        public string TeamName { get; set; }
        [Required]
        public string Country { get; set; }

    }
}
