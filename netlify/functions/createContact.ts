import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { nombre, correo, mensaje } = JSON.parse(event.body);

    const contacto = await prisma.contacto.create({
      data: {
        nombre,
        correo,
        mensaje,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(contacto),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};

export { handler };
