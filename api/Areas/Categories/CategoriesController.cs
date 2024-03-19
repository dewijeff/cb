using api.Areas.Categories.Models;
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
    private readonly ICategoryDomainService _categoryDomainService;

    public CategoriesController(ICategoryRepository categoryRepository,
        ICategoryDomainService categoryDomainService)
    {
        _categoryRepository = categoryRepository;
        _categoryDomainService = categoryDomainService;
    }
    
    [HttpGet]
    [Route("categories")]
    public async Task<IActionResult> GetCategories(CancellationToken cancellationToken)
    {
        var categories = await _categoryRepository.GetCategories(cancellationToken);

        return Json(categories, _jsonSettings);
    }

    [HttpPost]
    [Route("categories")]
    public async Task<IActionResult> AddCategory([FromBody] ListingCategory category,
        CancellationToken cancellationToken)
    {
        var response = _categoryDomainService.AddCategory(category, cancellationToken);

        return Json(response, _jsonSettings);
    }

    [HttpDelete]
    [Route("categories/{id}")]
    public async Task<IActionResult> DeleteCategory(string id, CancellationToken cancellationToken)
    {
        var result = await _categoryDomainService.DeleteCategory(id, cancellationToken);

        if (result)
            return Ok();

        return NotFound();
    }
}