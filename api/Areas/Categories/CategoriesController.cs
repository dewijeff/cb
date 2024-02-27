using api.Areas.Categories.Services;
using api.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Categories;

[ApiController]
[Route("cookbook")]
public class CategoriesController : Controller
{
    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
    
    [HttpGet]
    [Route("categories")]
    public async Task<IActionResult> GetContents(CancellationToken cancellationToken)
    {
        var categories = await _categoryRepository.GetCategories(cancellationToken);

        return Json(categories, _jsonSettings);
    }
}