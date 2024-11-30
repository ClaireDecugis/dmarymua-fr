import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Contact from "../pages/admin/contact";
jest.mock("axios");

describe("Contact Page Tests", () => {
  it("fetches all availabilities", async () => {
    const mockResponse = {
      data: {
        dates: ["2023-01-01", "2023-01-02"],
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      render(<Contact />);
    });

    // Vérifiez que la fonction fetchgetAllAvailabilities a été appelée
    expect(axios.get).toHaveBeenCalledWith("/api/getAllAvailabilities ");

    // Vérifiez que la mise à jour de l'état a eu lieu
    await waitFor(() => {
      expect(setgetAllAvailabilities).toHaveBeenCalledWith([
        "2023-01-01",
        "2023-01-02",
      ]);
    });
  });

  // Ajoutez d'autres tests pour les autres fonctions...
});
