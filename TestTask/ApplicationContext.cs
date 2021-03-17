using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.Models;

namespace TestTask
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) :base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
    }
}
