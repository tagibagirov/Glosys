using FluentValidation;

namespace Glosys.Models.Validator
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x=> x.ProductName).NotEmpty().WithMessage("Product name cannot be empty.").MaximumLength(50).WithMessage("Product name cannot exceed 50 characters."); ;
            RuleFor(x => x.ProductInfo).NotEmpty().WithMessage("Product description cannot be empty.").MaximumLength(300).WithMessage("Product description cannot exceed 300 characters."); ;
            //RuleFor(x => x.ProductPhotos).NotEmpty().WithMessage("Please select at least one product photo.");
            RuleFor(x => x.ProductCategoryId).NotEmpty().WithMessage("Please select a product category.");
        }
    }
}
