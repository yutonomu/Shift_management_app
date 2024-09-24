# Shift Management App

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-000000?logo=nextdotjs)](https://nextjs.org/)
[![Server Actions](https://img.shields.io/badge/Server%20Actions-000000)](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
[![API Routes](https://img.shields.io/badge/API%20Routes-000000)](https://nextjs.org/docs/api-routes/introduction)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.18.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.9-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.7-9F73AB)](https://next-auth.js.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-37.5.3-000000?logo=vercel)](https://vercel.com/)

## 概要

Shift Management Appは、シフトの入力、編集、削除、およびシフトの重複解決を行うことができるアプリケーションです。一般ユーザーと管理者の2種類のユーザーが存在し、それぞれの権限に応じた機能を提供します。

## ユーザーの種類

### 一般ユーザー

- **主な機能**：
  - シフトの入力、編集、削除が可能です。
- **利用環境**：
  - 基本的にモバイル端末での操作を想定しています。

### 管理者

- **主な機能**：
  - 現在のシフト状況を閲覧できます。
  - シフトの重複を解決することができます。
- **利用環境**：
  - 基本的にPCでの操作を想定しています。

## ログイン機能

- **Google認証**を使用してログインします。
- **ユーザー登録済み**のユーザーのみがログイン可能です。
  - ※現在はデータベースを直接操作してユーザー登録を行っています。

## シフトの操作方法

### シフトの入力

- **モバイル端末の場合**：
  - 画面下部のプラスボタンをタップして、新しいシフトを入力できます。

- **PCの場合**：
  - ヘッダーにある「新規登録」ボタンから、新しいシフトを入力できます。

https://github.com/user-attachments/assets/21a89ed8-ba83-410e-8264-c498847d1bfc

### シフトの編集

- **モバイル端末とPC共通**：
  - シフトをタップ（またはクリック）することで、編集が可能です。

https://github.com/user-attachments/assets/797172e4-04b7-4f20-ac63-417e9a2ad5ac

### シフトの削除

- **モバイル端末とPC共通**：
  - シフトをタップ（またはクリック）することで、削除が可能です。

https://github.com/user-attachments/assets/1c336389-2fd3-499d-9108-881e32f1edaf

## シフトが重複している場合の処理

### 一般ユーザーの場合

- シフトを入力または編集して登録する際、他のシフトと重複している場合は確認メッセージが表示されます。

https://github.com/user-attachments/assets/d47c7bff-a206-45ec-91bc-48fd46da8ff1

### 管理者の場合

- 重複しているシフトをタップまたはクリックすることで、どのシフトを優先するかの画面が表示され、重複を解決できます。

## カレンダーの月表示

- **モバイル端末の場合**：
  - 左上のハンバーガーメニューを開き、「月」ボタンをタップすることで月表示になります。
  <img src="https://github.com/user-attachments/assets/a8326651-7931-4c79-ba7e-0fb956db2c43" width="50%">

- **PCの場合**：
  - 左上の「月」ボタンをクリックすることで月表示になります。
![スクリーンショット 2024-08-25 194742](https://github.com/user-attachments/assets/0830208e-acfe-4e54-b871-208264e483a0)

## 使用技術スタック
![スクリーンショット 2024-09-24 022003](https://github.com/user-attachments/assets/1911c37a-953d-4bb8-abab-2094348e5f15)
