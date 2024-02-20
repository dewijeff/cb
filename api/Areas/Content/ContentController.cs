using api.Areas.Content.Services.Contracts;
using api.Areas.Content.Services.Repositories.Contracts;
using api.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Content;

[ApiController]
[Route("cookbook")]
public class ContentController : Controller
{
    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;

    private readonly IReadOnlyCategoryRepository _categoryRepository;
    private readonly IRecipeDomainService _recipeDomainService;

    public ContentController(
        IReadOnlyCategoryRepository categoryRepository,
        IRecipeDomainService recpieDomainService)
    {
        _categoryRepository = categoryRepository;
        _recipeDomainService = recpieDomainService;
    }

    [HttpGet]
    [Route("contents")]
    public async Task<IActionResult> GetContents(CancellationToken cancellationToken)
    {
        var allRecipes = await _categoryRepository.GetCategories(cancellationToken);

        return Json(allRecipes, _jsonSettings);
    }

    [HttpGet]
    [Route("recipe")]
    public async Task<IActionResult> GetRecipe([FromQuery] string id, CancellationToken cancellationToken)
    {
        var recipe = await _recipeDomainService.GetRecipe(id, cancellationToken);

        return Json(recipe, _jsonSettings);
    }
}