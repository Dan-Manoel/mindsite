export interface AutentiqueDocumentInfo {
  id: string;
  name: string;
  signed: boolean;
  signUrl?: string;
  downloadUrl?: string;
}

interface AutentiqueSignatureNode {
  public_id?: string;
  name?: string;
  email?: string;
  signed?: { created?: string } | boolean | null;
  link?: { short_link?: string | null } | null;
}

export async function getAutentiqueDocument(docId: string): Promise<AutentiqueDocumentInfo | null> {
  const token = process.env.AUTENTIQUE_API_TOKEN;
  if (!token || !docId) return null;

  const query = `
    query GetDocument($id: String!) {
      document(id: $id) {
        id
        name
        signatures {
          public_id
          name
          email
          signed {
            created
          }
          link {
            short_link
          }
        }
        files {
          signed
          original
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.autentique.com.br/v2/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { id: docId },
      }),
    });

    const { data } = await res.json();
    if (!data?.document) return null;

    const doc = data.document;
    const signatures: AutentiqueSignatureNode[] = Array.isArray(doc.signatures) ? doc.signatures : [];
    const isSigned = signatures.length > 0 && signatures.every((s) => !!s.signed);
    const clientSignature = signatures.find((s) => !s.signed);

    return {
      id: doc.id,
      name: doc.name,
      signed: isSigned,
      signUrl: clientSignature?.link?.short_link || undefined,
      downloadUrl: doc.files?.signed || doc.files?.original || undefined,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao consultar Autentique:", message);
    return null;
  }
}