import { getDb } from "./client";
import { adminUsers } from "./schema";
import { hashPassword } from "@/src/auth/password";

const ADMIN_EMAIL = "jeff.cline@me.com";
const TEMP_PASSWORD = "TEMP!23";

async function main() {
  const db = getDb();
  const passwordHash = await hashPassword(TEMP_PASSWORD);

  const inserted = await db
    .insert(adminUsers)
    .values({ email: ADMIN_EMAIL, passwordHash, mustChangePassword: true })
    .onConflictDoNothing({ target: adminUsers.email })
    .returning({ id: adminUsers.id });

  if (inserted.length > 0) {
    console.log(`seed: created admin user ${ADMIN_EMAIL} (must change password)`);
  } else {
    console.log(`seed: admin user ${ADMIN_EMAIL} already exists, left untouched`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
