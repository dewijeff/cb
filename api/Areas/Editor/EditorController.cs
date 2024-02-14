using api.Areas.Editor.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace api.Areas.Editor
{
    [ApiController]
    [Route("CookbookEditor")]
    public class EditorController : ControllerBase
    {
        [HttpPost]
        [Route("add-recipe")]
        public async Task<IActionResult> AddRecipe([FromBody] AddRecipeRequest request, CancellationToken cancellationToken)
        {
            // add item to repository


            return new CreatedResult("location", new {}); // TODO - what info about 
        }

        [HttpPut]
        [Route("update-recipe")]
        public async Task<IActionResult> UpdateRecipe([FromBody] UpdateRecipeRequest request, CancellationToken cancellationToken)
        {
            // update item in repository

            return new OkResult();
        }

        [HttpDelete]
        [Route("delete-recipe")]
        public async Task<IActionResult> DeleteRecipe([FromQuery] string identifier, CancellationToken cancellationToken)
        {
            return new OkResult();
        }
    }
}
