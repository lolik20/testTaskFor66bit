using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.Models;
using TestTask.Models.SpecialModels;

namespace TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FutController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private int NewTeamId { get; set; }
        public FutController(ApplicationContext db)
        {
            _dbContext = db;
        }

        [HttpGet("player/{id}")]
        public async Task<ActionResult<Player>> GetPlayerById(int id)
        {
            var player = await _dbContext.Players.FirstOrDefaultAsync(x => x.Id == id);
            if (player != null)
                return Ok(player);
            else
                return NotFound();
        }

        [HttpGet("players/all")]

        public async Task<ActionResult<List<PlayerListModel>>> GetAllPlayers()
        {
            var playersToBeView = await _dbContext.Players.Join(_dbContext.Teams,
                player => player.TeamId,
                team => team.Id,
                (player, team) => new PlayerListModel() { Id = player.Id, Name = player.Name, SecondName = player.SecondName, Gender = player.Gender, Birthday = player.Birthday, Title = team.Title, Country = team.Country, TeamId = team.Id }
                ).ToListAsync();
            return Ok(playersToBeView);
        }
       
        [HttpGet("team/all")]
        public async Task<ActionResult<List<Team>>> GetTeamById()
        {
            var team = await _dbContext.Teams.ToListAsync();
            if (team != null)
                return Ok(team);
            else
                return NotFound();
        }


        [HttpPost("player/add")]
        public async Task<ActionResult<Player>> AddPlayer(AddPlayerModel playerToBeAdded)
        {

            var team = await _dbContext.Teams.FirstOrDefaultAsync(x => x.Title.Contains(playerToBeAdded.TeamName));

            if (team == null)
            {

                var teamToBeAdded = new Team() { Title = playerToBeAdded.TeamName, Country = playerToBeAdded.Country };
                await _dbContext.Teams.AddAsync(teamToBeAdded);
                await _dbContext.SaveChangesAsync();
                NewTeamId = teamToBeAdded.Id;
            }
            else
            {
                NewTeamId = team.Id;
            }
            var player = await _dbContext.Players.FirstOrDefaultAsync(x => x.SecondName.Contains(playerToBeAdded.SecondName));
            if (player != null)
            {
                if (playerToBeAdded.Name == player.Name && playerToBeAdded.Gender == playerToBeAdded.Gender && playerToBeAdded.Birthday == player.Birthday)
                {
                    throw new Exception("такой player уже есть");
                }
            }
          
            var newPlayer = new Player() { Name = playerToBeAdded.Name, SecondName = playerToBeAdded.SecondName, Birthday = playerToBeAdded.Birthday, Gender = playerToBeAdded.Gender, TeamId = NewTeamId };
            await _dbContext.AddAsync(newPlayer);
            await _dbContext.SaveChangesAsync();
            return Ok(newPlayer);

        }
        [HttpPut("player/edit")]
        public async Task<ActionResult<Player>> Edit(Player player)
        {

            if (player == null)
            {
                return BadRequest();
            }
            if (!_dbContext.Players.Any(x => x.Id == player.Id))
            {
                return NotFound();
            }

            _dbContext.Update(player);
            await _dbContext.SaveChangesAsync();
            return Ok(player);

        }

    }
}
