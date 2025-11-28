import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { mockAdmins } from "@/lib/admin.mock";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    // Find admin
    const admin = mockAdmins.find((a) => a._id === session.user.id);

    if (!admin) {
      return NextResponse.json(
        { message: "Admin không tồn tại" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại không đúng" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password (in real app, update in database)
    admin.password = hashedPassword;
    admin.updatedAt = new Date().toISOString();

    return NextResponse.json({
      message: "Đổi mật khẩu thành công",
      success: true,
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}
