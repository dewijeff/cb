using System.Text.Json;
using api.Areas.Content.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Areas.Content
{
    [ApiController]
    [Route("cookbook")]
    public class ContentController : ControllerBase
    {
        [HttpGet]
        [Route("recipe")] 
        public async Task<IActionResult> GetRecipe([FromQuery] string id, CancellationToken cancellationToken)
        {
            // TODO: Get the data from the 

            var recipeResult = new Recipe();

            return new JsonResult(JsonSerializer.Serialize(recipeResult));
        }

        [HttpGet]
        [Route("contents")]
        public async Task<IActionResult> GetRecipes(CancellationToken cancellationToken)
        {
            // TODO: Get the table of contents
            var allRecipes = new List<ListingCategory>();

            return new JsonResult(JsonSerializer.Serialize(allRecipes));
        }

    }
}
