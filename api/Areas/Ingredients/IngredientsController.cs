using api.Areas.Ingredients.Services;
using api.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Ingredients;

[ApiController]
[Route("cookbook")]
public class IngredientsController : Controller
{
    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
    private readonly IIngredientRepository _ingredientRepository;

    public IngredientsController(
        IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    [HttpGet]
    [Route("ingredients")]
    public async Task<IActionResult> GetIngredients(CancellationToken cancellationToken)
    {
        var ingredients = await _ingredientRepository.GetIngredients(cancellationToken);

        return Json(ingredients, _jsonSettings);
    }
}