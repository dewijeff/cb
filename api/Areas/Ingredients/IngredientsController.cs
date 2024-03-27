using api.Areas.Auth.Models;
using api.Areas.Ingredients.Models;
using api.Areas.Ingredients.Services;
using api.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Ingredients;

[Authorize]
[ApiController]
[Route("cookbook")]
public class IngredientsController : Controller
{
    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IIngredientDomainService _ingredientDomainService;

    public IngredientsController(
        IIngredientRepository ingredientRepository,
        IIngredientDomainService ingredientDomainService)
    {
        _ingredientRepository = ingredientRepository;
        _ingredientDomainService = ingredientDomainService;
    }

    [HttpGet]
    [Route("ingredients")]
    public async Task<IActionResult> GetIngredients(CancellationToken cancellationToken)
    {
        var ingredients = await _ingredientRepository.GetIngredients(cancellationToken);

        return Json(ingredients, _jsonSettings);
    }

    [Authorize(Policy = IdentityData.CanEditPolicyName)]
    [HttpPost]
    [Route("ingredients")]
    public async Task<IActionResult> AddIngredient([FromBody] Ingredient ingredient, CancellationToken cancellationToken)
    {
        var result = await _ingredientDomainService.AddIngredient(ingredient, cancellationToken);

        return Json(result, _jsonSettings);
    }

    [Authorize(Policy = IdentityData.CanEditPolicyName)]
    [HttpPut]
    [Route("ingredients")]
    public async Task<IActionResult> EditIngredient([FromBody]Ingredient ingredient,
        CancellationToken cancellationToken)
    {
        var editedCount = await _ingredientDomainService.EditIngredient(ingredient, cancellationToken);

        if (editedCount > 0)
            return Ok();

        return NotFound(); // TODO: @JXD - This isn't necessarily 100% accurate, but if it doesn't blow up and it wasn't deleted, this is the likely cause...
    }

    [Authorize(Policy = IdentityData.CanEditPolicyName)]
    [HttpDelete]
    [Route("ingredients/{id}")]
    public async Task<IActionResult> DeleteIngredient(string id, CancellationToken cancellationToken)
    {
        var result = await _ingredientRepository.DeleteIngredient(id, cancellationToken);

        if (result)
            return Ok();

        return NotFound(); // Alternatively - this could be a bad request if the ingredient is being used.
    }
}