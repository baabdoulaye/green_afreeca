const request = require("supertest");
const app = require("../server"); // On importe ton API

describe("Tests de l'API Green Afreeca", () => {
  // Test n°1 : Vérification que l'API est en ligne (Health Check)
  it("La route principale (/) doit renvoyer le statut 200 et un message de succès", async () => {
    // Supertest simule une requête GET sur "/"
    const response = await request(app).get("/");

    // Nos assertions
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(
      "🚀 API Green Afreeca est opérationnelle !",
    );
  });

  // Test n°2 : Vérification de la gestion des erreurs (Route introuvable)
  it("Doit renvoyer une erreur 404 pour une route qui n'existe pas", async () => {
    // On simule une requête sur une fausse URL (qui n'existe pas dans ton routeur)
    const response = await request(app).get("/api/route-secrete-inexistante");

    // On s'attend à ce que le serveur réponde par une erreur 404 (Not Found)
    expect(response.statusCode).toBe(404);
  });
});
