using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class bac : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventRaw",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Ts = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AnonId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    Referrer = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    Ua = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    PropsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventRaw", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserFeature",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    RecencyDays = table.Column<int>(type: "int", nullable: true),
                    Frequency = table.Column<int>(type: "int", nullable: true),
                    Monetary = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    LastComputedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFeature", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "UserPropensity",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Probability = table.Column<double>(type: "float", nullable: false),
                    ModelVersion = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    GeneratedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPropensity", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "UserRecommendation",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    ProductId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    ModelVersion = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    GeneratedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRecommendation", x => new { x.UserId, x.ProductId });
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventRaw_Name_Ts",
                table: "EventRaw",
                columns: new[] { "Name", "Ts" });

            migrationBuilder.CreateIndex(
                name: "IX_UserRecommendation_UserId_Score",
                table: "UserRecommendation",
                columns: new[] { "UserId", "Score" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventRaw");

            migrationBuilder.DropTable(
                name: "UserFeature");

            migrationBuilder.DropTable(
                name: "UserPropensity");

            migrationBuilder.DropTable(
                name: "UserRecommendation");
        }
    }
}
