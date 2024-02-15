using System.Text.Json;
using api.Areas.Content.Models;
using api.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Areas.Content
{
    [ApiController]
    [Route("cookbook")]
    public class ContentController : Controller
    {
        private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
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
        public async Task<IActionResult> GetContents(CancellationToken cancellationToken)
        {
            // TODO: Get the table of contents
            var allRecipes = new List<ListingCategory>();

            return Json(allRecipes, _jsonSettings);
        }

    }
}
