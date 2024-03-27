using api.Areas.Recipes.Models;
using api.Areas.Recipes.Services;
using api.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Recipes;

[ApiController]
[Route("cookbook")]
public class RecipesController : Controller
{
    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
    private readonly IRecipeDomainService _recipeDomainService;

    public RecipesController(IRecipeDomainService recipeDomainService)
    {
        _recipeDomainService = recipeDomainService;
    }

    [HttpGet]
    [Route("recipes/{id}")]
    public async Task<IActionResult> GetRecipe(string id, CancellationToken cancellationToken)
    {
        var recipe = await _recipeDomainService.GetRecipe(id, cancellationToken);

        return Json(recipe, _jsonSettings);
    }

    [Authorize]
    [HttpPost]
    [Route("recipes")]
    public async Task<IActionResult> AddRecipe([FromBody] Recipe request, CancellationToken cancellationToken)
    {
        var recipe = await _recipeDomainService.AddRecipe(request, cancellationToken);

        return Json(recipe, _jsonSettings);
    }

    [Authorize]
    [HttpPut]
    [Route("recipes/{id}")]
    public async Task<IActionResult> UpdateRecipe(string id, [FromBody] Recipe request, CancellationToken cancellationToken)
    {
        var recipe = await _recipeDomainService.UpdateRecipe(id, request, cancellationToken);

        return Json(recipe, _jsonSettings);
    }

    [Authorize]
    [HttpDelete]
    [Route("recipes/{id}")]
    public async Task<IActionResult> DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        var success = await _recipeDomainService.DeleteRecipe(id, cancellationToken);

        if (!success)
            return BadRequest(); // TODO: @JLD - throw exception?

        return new OkResult();
    }
}