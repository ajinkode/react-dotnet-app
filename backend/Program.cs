using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddControllers(); // Adds services required for controllers

// Configure CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Adjust to your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Detailed error pages for development
}

app.UseRouting(); // Adds middleware for routing requests

app.UseCors(); // Enables CORS middleware

app.UseAuthorization(); // Enables authorization middleware

app.MapControllers(); // Maps controller endpoints

app.Run(); // Starts the application
