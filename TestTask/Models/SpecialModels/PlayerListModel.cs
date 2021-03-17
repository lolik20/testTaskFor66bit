using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models.SpecialModels
{
    public class PlayerListModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string SecondName { get; set; }

        public string Gender { get; set; }


        public string Birthday { get; set; }

        public string Title { get; set; }
        public string Country { get; set; }
        public int TeamId { get; set;}
    }
}
