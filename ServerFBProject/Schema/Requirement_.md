Requirement:

-   Diminta untuk menampilkan data seseorang berdasarkan id yang dimiliki
    -> Tampilkan juga Follower
    -> Tampilkan juga Following

Query secara naif...: 1. GetUserById -> Users.findX() 2. GetFollowerByUserId -> Follows.findX 3. GetFollowingByUserId -> Follows.findX
----- 4. Combine All-in-one
