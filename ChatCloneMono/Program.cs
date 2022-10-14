using System.Reflection;
using System.Security.Claims;
using ChatCloneMono.DbUtils;
using ChatCloneMono.Utils.MiddlewareUtils;
using ChatCloneMono.Controllers.Repositories;
using ChatCloneMono.Controllers.RepositoryInterfaces;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
//get configuration object
var config = builder.Configuration;

// Add services to the container.
builder.Services.AddMvc();
builder.Services.AddControllers();

//Add Fluent Migrator
builder.Services
        .AddLogging(c => c.AddFluentMigratorConsole())
        .AddFluentMigratorCore()
        .ConfigureRunner(c => c
            .AddPostgres()
            .WithGlobalConnectionString(config["Database:Connection"])
            .ScanIn(Assembly.GetExecutingAssembly()).For.All());

//Add Auth0 Auth MiddleWare
string domain = $"https://{config["Auth0:Domain"]}/";
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = $"{config["Auth0:Audience"]}";
        options.RequireHttpsMetadata = false;
        // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
});

//Add Singletons
builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");

//Database.EnsureDatabase("postgresql://postgres:ZnsqJZyAvp6vdtdppC*7LpVw@testdevdb.cpufyyqpkd15.us-east-1.rds.amazonaws.com", "chat_clone");
app.Migrate();

app.Run();

